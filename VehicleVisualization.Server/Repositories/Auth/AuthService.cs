using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VehicleVisualization.Server.Model.Auth;
using VehicleVisualization.Server.Repositories.MenuPermission;

namespace VehicleVisualization.Server.Repositories.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMenuPermissionService _menuPermissionService;

        public AuthService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMenuPermissionService menuPermissionService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _menuPermissionService = menuPermissionService;
        }

        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new IdentityUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return new OkObjectResult(new { message = "User registered successfully" });
            }

            return new BadRequestObjectResult(result.Errors);
        }

        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Name, user.UserName)
                };

                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    expires: DateTime.Now.AddMinutes(int.Parse(_configuration["Jwt:ExpiryMinutes"])),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                        SecurityAlgorithms.HmacSha256));

				var refreshToken = Guid.NewGuid().ToString();

				return new OkObjectResult(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
					expired = DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpiryMinutes"])),
					refreshToken
				});
            }

            return new UnauthorizedResult();
        }

		public async Task<IActionResult> RefreshToken(string token, string refreshToken)
		{
			var principal = GetPrincipalFromExpiredToken(token);
			if (principal == null)
			{
				return new BadRequestObjectResult("Invalid token");
			}

			var username = principal.Identity.Name;
			var user = await _userManager.FindByNameAsync(username);
			if (user == null)
			{
				return new UnauthorizedResult();
			}

			var newJwtToken = GenerateJwtToken(principal.Claims);
			var newRefreshToken = Guid.NewGuid().ToString();

			return new OkObjectResult(new
			{
				token = newJwtToken,
				refreshToken = newRefreshToken
			});
		}

		private string GenerateJwtToken(IEnumerable<Claim> claims)
		{
			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				expires: DateTime.Now.AddMinutes(int.Parse(_configuration["Jwt:ExpiryMinutes"])),
				claims: claims,
				signingCredentials: new SigningCredentials(
					new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
					SecurityAlgorithms.HmacSha256));

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
		{
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateAudience = false,
				ValidateIssuer = false,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
				ValidateLifetime = false
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken securityToken;

			try
			{
				var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
				var jwtSecurityToken = securityToken as JwtSecurityToken;

				if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
				{
					throw new SecurityTokenException("Invalid token");
				}

				return principal;
			}
			catch (Exception ex)
			{
				throw new SecurityTokenMalformedException("The JWT token provided is invalid.");
			}
		}

		public async Task<IActionResult> AddRole(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                var result = await _roleManager.CreateAsync(new IdentityRole(role));
                if (result.Succeeded)
                {
                    return new OkObjectResult(new { message = "Role added successfully" });
                }

                return new BadRequestObjectResult(result.Errors);
            }

            return new BadRequestObjectResult("Role already exists");
        }

        public async Task<IActionResult> AssignRole(UserRoleModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return new BadRequestObjectResult("User not found");
            }

            var result = await _userManager.AddToRoleAsync(user, model.Role);
            if (result.Succeeded)
            {
                return new OkObjectResult(new { message = "Role assigned successfully" });
            }

            return new BadRequestObjectResult(result.Errors);
        }
    }
}
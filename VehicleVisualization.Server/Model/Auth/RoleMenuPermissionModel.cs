using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleVisualization.Server.Model.Auth
{
    [Table(name: "TB_M_ROLE_MENU_PERMISSION")]
    public class RoleMenuPermissionModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("TB_M_ROLES")]
        public string? RoleId { get; set; }

        [ForeignKey("TB_M_NAVIGATION_MENU")]
        public string? NavigationMenuId { get; set; }

        public NavigationMenuModel? NavigationMenu { get; set; }
    }
}
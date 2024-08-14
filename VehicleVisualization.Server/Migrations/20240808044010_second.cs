using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleVisualization.Server.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_M_NAVIGATION_MENU",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentMenuId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ControllerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_NAVIGATION_MENU", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_M_NAVIGATION_MENU_TB_M_NAVIGATION_MENU_ParentMenuId",
                        column: x => x.ParentMenuId,
                        principalTable: "TB_M_NAVIGATION_MENU",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TB_M_ROLE_MENU_PERMISSION",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NavigationMenuId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_ROLE_MENU_PERMISSION", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_M_ROLE_MENU_PERMISSION_TB_M_NAVIGATION_MENU_NavigationMen~",
                        column: x => x.NavigationMenuId,
                        principalTable: "TB_M_NAVIGATION_MENU",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TB_M_ROLE_MENU_PERMISSION_TB_M_ROLES_Id~",
                        column: x => x.RoleId,
                        principalTable: "TB_M_ROLES",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TB_M_NAVIGATION_MENU_ParentMenuId",
                table: "TB_M_NAVIGATION_MENU",
                column: "ParentMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_M_ROLE_MENU_PERMISSION_NavigationMenuId",
                table: "TB_M_ROLE_MENU_PERMISSION",
                column: "NavigationMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_M_ROLE_MENU_PERMISSION_RoleId",
                table: "TB_M_ROLE_MENU_PERMISSION",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_M_ROLE_MENU_PERMISSION");

            migrationBuilder.DropTable(
                name: "TB_M_NAVIGATION_MENU");
        }
    }
}
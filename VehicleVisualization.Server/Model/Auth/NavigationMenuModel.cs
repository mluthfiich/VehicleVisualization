using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleVisualization.Server.Model.Auth
{
    [Table(name: "TB_M_NAVIGATION_MENU")]
    public class NavigationMenuModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Id { get; set; }

        public string? Name { get; set; }

        [ForeignKey("ParentNavigationMenu")]
        public string? ParentMenuId { get; set; }

        public virtual NavigationMenuModel? ParentNavigationMenu { get; set; }

        public string? ControllerName { get; set; }

        public string? ActionName { get; set; }

        public int? Position { get; set; }

        [NotMapped]
        public bool Permitted { get; set; }
    }
}
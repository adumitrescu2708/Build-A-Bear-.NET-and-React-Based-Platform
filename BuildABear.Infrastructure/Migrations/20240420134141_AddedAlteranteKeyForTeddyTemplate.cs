using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class AddedAlteranteKeyForTeddyTemplate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_TeddyTemplate_TeddyName",
                table: "TeddyTemplate",
                column: "TeddyName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_TeddyTemplate_TeddyName",
                table: "TeddyTemplate");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class ModifiedDeleteTeddyCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teddy_Cart_CartId",
                table: "Teddy");

            migrationBuilder.AddForeignKey(
                name: "FK_Teddy_Cart_CartId",
                table: "Teddy",
                column: "CartId",
                principalTable: "Cart",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teddy_Cart_CartId",
                table: "Teddy");

            migrationBuilder.AddForeignKey(
                name: "FK_Teddy_Cart_CartId",
                table: "Teddy",
                column: "CartId",
                principalTable: "Cart",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

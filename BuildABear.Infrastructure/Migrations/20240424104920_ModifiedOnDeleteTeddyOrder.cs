using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class ModifiedOnDeleteTeddyOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teddy_Order_OrderId",
                table: "Teddy");

            migrationBuilder.AddForeignKey(
                name: "FK_Teddy_Order_OrderId",
                table: "Teddy",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teddy_Order_OrderId",
                table: "Teddy");

            migrationBuilder.AddForeignKey(
                name: "FK_Teddy_Order_OrderId",
                table: "Teddy",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");
        }
    }
}

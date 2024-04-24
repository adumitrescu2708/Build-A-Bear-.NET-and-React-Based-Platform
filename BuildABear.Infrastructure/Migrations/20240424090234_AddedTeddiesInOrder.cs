using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class AddedTeddiesInOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Cart_CartId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_CartId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Order");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "Teddy",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "Cart",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teddy_OrderId",
                table: "Teddy",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_OrderId",
                table: "Cart",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Order_OrderId",
                table: "Cart",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Teddy_Order_OrderId",
                table: "Teddy",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Order_OrderId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Teddy_Order_OrderId",
                table: "Teddy");

            migrationBuilder.DropIndex(
                name: "IX_Teddy_OrderId",
                table: "Teddy");

            migrationBuilder.DropIndex(
                name: "IX_Cart_OrderId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Teddy");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Cart");

            migrationBuilder.AddColumn<Guid>(
                name: "CartId",
                table: "Order",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Order_CartId",
                table: "Order",
                column: "CartId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Cart_CartId",
                table: "Order",
                column: "CartId",
                principalTable: "Cart",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

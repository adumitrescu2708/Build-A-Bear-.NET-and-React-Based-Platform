using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class ModifiedUsersCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Cart_UserId",
                table: "Cart");

            migrationBuilder.AddColumn<Guid>(
                name: "MainCartId",
                table: "User",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "MainCartId1",
                table: "User",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_User_MainCartId1",
                table: "User",
                column: "MainCartId1");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Cart_MainCartId1",
                table: "User",
                column: "MainCartId1",
                principalTable: "Cart",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Cart_MainCartId1",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_MainCartId1",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Cart_UserId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "MainCartId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "MainCartId1",
                table: "User");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId",
                unique: true);
        }
    }
}

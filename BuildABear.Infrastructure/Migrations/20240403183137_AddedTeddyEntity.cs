using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class AddedTeddyEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeddyTeddyItem_Teddy_TeddysId",
                table: "TeddyTeddyItem");

            migrationBuilder.DropForeignKey(
                name: "FK_TeddyTeddyItem_TeddyItem_ItemsId",
                table: "TeddyTeddyItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeddyTeddyItem",
                table: "TeddyTeddyItem");

            migrationBuilder.RenameTable(
                name: "TeddyTeddyItem",
                newName: "TeddyItems");

            migrationBuilder.RenameIndex(
                name: "IX_TeddyTeddyItem_TeddysId",
                table: "TeddyItems",
                newName: "IX_TeddyItems_TeddysId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeddyItems",
                table: "TeddyItems",
                columns: new[] { "ItemsId", "TeddysId" });

            migrationBuilder.AddForeignKey(
                name: "FK_TeddyItems_Teddy_TeddysId",
                table: "TeddyItems",
                column: "TeddysId",
                principalTable: "Teddy",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeddyItems_TeddyItem_ItemsId",
                table: "TeddyItems",
                column: "ItemsId",
                principalTable: "TeddyItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeddyItems_Teddy_TeddysId",
                table: "TeddyItems");

            migrationBuilder.DropForeignKey(
                name: "FK_TeddyItems_TeddyItem_ItemsId",
                table: "TeddyItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeddyItems",
                table: "TeddyItems");

            migrationBuilder.RenameTable(
                name: "TeddyItems",
                newName: "TeddyTeddyItem");

            migrationBuilder.RenameIndex(
                name: "IX_TeddyItems_TeddysId",
                table: "TeddyTeddyItem",
                newName: "IX_TeddyTeddyItem_TeddysId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeddyTeddyItem",
                table: "TeddyTeddyItem",
                columns: new[] { "ItemsId", "TeddysId" });

            migrationBuilder.AddForeignKey(
                name: "FK_TeddyTeddyItem_Teddy_TeddysId",
                table: "TeddyTeddyItem",
                column: "TeddysId",
                principalTable: "Teddy",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeddyTeddyItem_TeddyItem_ItemsId",
                table: "TeddyTeddyItem",
                column: "ItemsId",
                principalTable: "TeddyItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

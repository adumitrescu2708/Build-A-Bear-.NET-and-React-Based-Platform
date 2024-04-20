using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuildABear.Infrastructure.Migrations
{
    public partial class ModifiedforTeddyTemplate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TeddyTemplate",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Path = table.Column<string>(type: "text", nullable: false),
                    Filename = table.Column<string>(type: "text", nullable: false),
                    TeddyName = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeddyTemplate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teddy",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Filling = table.Column<string>(type: "text", nullable: false),
                    TeddyTemplateId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teddy", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Teddy_TeddyTemplate_TeddyTemplateId",
                        column: x => x.TeddyTemplateId,
                        principalTable: "TeddyTemplate",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeddyTeddyItem",
                columns: table => new
                {
                    ItemsId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeddysId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeddyTeddyItem", x => new { x.ItemsId, x.TeddysId });
                    table.ForeignKey(
                        name: "FK_TeddyTeddyItem_Teddy_TeddysId",
                        column: x => x.TeddysId,
                        principalTable: "Teddy",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeddyTeddyItem_TeddyItem_ItemsId",
                        column: x => x.ItemsId,
                        principalTable: "TeddyItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teddy_TeddyTemplateId",
                table: "Teddy",
                column: "TeddyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_TeddyTeddyItem_TeddysId",
                table: "TeddyTeddyItem",
                column: "TeddysId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeddyTeddyItem");

            migrationBuilder.DropTable(
                name: "Teddy");

            migrationBuilder.DropTable(
                name: "TeddyTemplate");
        }
    }
}

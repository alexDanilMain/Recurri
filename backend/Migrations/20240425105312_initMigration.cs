using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class initMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventDateTimes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeZone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventDateTimes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CalendarEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EndId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Recurrence = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtendedPropertiesJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CalendarEvents_EventDateTimes_EndId",
                        column: x => x.EndId,
                        principalTable: "EventDateTimes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CalendarEvents_EventDateTimes_StartId",
                        column: x => x.StartId,
                        principalTable: "EventDateTimes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CalendarEvents_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_EndId",
                table: "CalendarEvents",
                column: "EndId");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_StartId",
                table: "CalendarEvents",
                column: "StartId");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_TemplateId",
                table: "CalendarEvents",
                column: "TemplateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalendarEvents");

            migrationBuilder.DropTable(
                name: "EventDateTimes");

            migrationBuilder.DropTable(
                name: "Templates");
        }
    }
}

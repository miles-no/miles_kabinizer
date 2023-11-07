using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kabinizer_data.Migrations
{
    /// <inheritdoc />
    public partial class MoveIsSpecialToDraw : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeadlineDate",
                table: "Period");

            migrationBuilder.DropColumn(
                name: "IsSpecialPeriod",
                table: "Period");

            migrationBuilder.AddColumn<bool>(
                name: "IsSpecial",
                table: "Draws",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSpecial",
                table: "Draws");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeadlineDate",
                table: "Period",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsSpecialPeriod",
                table: "Period",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

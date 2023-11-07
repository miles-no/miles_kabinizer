using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kabinizer_data.Migrations
{
    /// <inheritdoc />
    public partial class Fix_Period : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Period_Period_PeriodEntityId",
                table: "Period");

            migrationBuilder.DropIndex(
                name: "IX_Period_PeriodEntityId",
                table: "Period");

            migrationBuilder.DropColumn(
                name: "DeadlineDate",
                table: "Period");

            migrationBuilder.DropColumn(
                name: "IsSpecialPeriod",
                table: "Period");

            migrationBuilder.DropColumn(
                name: "PeriodEntityId",
                table: "Period");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<Guid>(
                name: "PeriodEntityId",
                table: "Period",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Period_PeriodEntityId",
                table: "Period",
                column: "PeriodEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Period_Period_PeriodEntityId",
                table: "Period",
                column: "PeriodEntityId",
                principalTable: "Period",
                principalColumn: "Id");
        }
    }
}

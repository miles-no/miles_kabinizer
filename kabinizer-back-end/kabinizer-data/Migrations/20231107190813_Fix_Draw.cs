using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kabinizer_data.Migrations
{
    /// <inheritdoc />
    public partial class Fix_Draw : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Period_Draws_DrawId",
                table: "Period");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Draws",
                table: "Draws");

            migrationBuilder.RenameTable(
                name: "Draws",
                newName: "Draw");

            migrationBuilder.RenameColumn(
                name: "Start",
                table: "Draw",
                newName: "DeadlineStart");

            migrationBuilder.RenameColumn(
                name: "End",
                table: "Draw",
                newName: "DeadlineEnd");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_Draw",
                table: "Draw",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Period_Draw_DrawId",
                table: "Period",
                column: "DrawId",
                principalTable: "Draw",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Period_Draw_DrawId",
                table: "Period");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Draw",
                table: "Draw");

            migrationBuilder.DropColumn(
                name: "DeadlineDate",
                table: "Period");

            migrationBuilder.DropColumn(
                name: "IsSpecialPeriod",
                table: "Period");

            migrationBuilder.RenameTable(
                name: "Draw",
                newName: "Draws");

            migrationBuilder.RenameColumn(
                name: "DeadlineStart",
                table: "Draws",
                newName: "Start");

            migrationBuilder.RenameColumn(
                name: "DeadlineEnd",
                table: "Draws",
                newName: "End");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Draws",
                table: "Draws",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Period_Draws_DrawId",
                table: "Period",
                column: "DrawId",
                principalTable: "Draws",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

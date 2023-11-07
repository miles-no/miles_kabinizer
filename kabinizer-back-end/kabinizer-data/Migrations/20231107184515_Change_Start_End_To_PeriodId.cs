using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kabinizer_data.Migrations
{
    /// <inheritdoc />
    public partial class Change_Start_End_To_PeriodId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromDate",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "ToDate",
                table: "BookingRequest");

            migrationBuilder.AddColumn<Guid>(
                name: "PeriodEntityId",
                table: "Period",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PeriodId",
                table: "BookingRequest",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Period_PeriodEntityId",
                table: "Period",
                column: "PeriodEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingRequest_PeriodId",
                table: "BookingRequest",
                column: "PeriodId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingRequest_Period_PeriodId",
                table: "BookingRequest",
                column: "PeriodId",
                principalTable: "Period",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Period_Period_PeriodEntityId",
                table: "Period",
                column: "PeriodEntityId",
                principalTable: "Period",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingRequest_Period_PeriodId",
                table: "BookingRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_Period_Period_PeriodEntityId",
                table: "Period");

            migrationBuilder.DropIndex(
                name: "IX_Period_PeriodEntityId",
                table: "Period");

            migrationBuilder.DropIndex(
                name: "IX_BookingRequest_PeriodId",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "PeriodEntityId",
                table: "Period");

            migrationBuilder.DropColumn(
                name: "PeriodId",
                table: "BookingRequest");

            migrationBuilder.AddColumn<DateTime>(
                name: "FromDate",
                table: "BookingRequest",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ToDate",
                table: "BookingRequest",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}

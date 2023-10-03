using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kabinizer_data.Migrations
{
    /// <inheritdoc />
    public partial class Create_BookingRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBy",
                table: "BookingRequest",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "BookingRequest",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "BookingRequest",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "BookingRequest",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "BookingRequest",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "FromDate",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "ToDate",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "BookingRequest");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BookingRequest");
        }
    }
}

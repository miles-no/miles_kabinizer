using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kabinizer_data.Migrations
{
    /// <inheritdoc />
    public partial class Addeddescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Period",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Period");
        }
    }
}

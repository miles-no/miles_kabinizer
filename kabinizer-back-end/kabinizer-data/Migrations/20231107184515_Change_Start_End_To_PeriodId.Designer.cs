﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using kabinizer_data;

#nullable disable

namespace kabinizer_data.Migrations
{
    [DbContext(typeof(EntityContext))]
    [Migration("20231107184515_Change_Start_End_To_PeriodId")]
    partial class Change_Start_End_To_PeriodId
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("kabinizer_data.DrawEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("End")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Start")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Draws");
                });

            modelBuilder.Entity("kabinizer_data.Entities.BookingRequestEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("PeriodId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PeriodId");

                    b.ToTable("BookingRequest");
                });

            modelBuilder.Entity("kabinizer_data.Entities.PeriodEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DeadlineDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("DrawId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsSpecialPeriod")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PeriodEnd")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("PeriodEntityId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("PeriodStart")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DrawId");

                    b.HasIndex("PeriodEntityId");

                    b.ToTable("Period");
                });

            modelBuilder.Entity("kabinizer_data.Entities.BookingRequestEntity", b =>
                {
                    b.HasOne("kabinizer_data.Entities.PeriodEntity", "Period")
                        .WithMany()
                        .HasForeignKey("PeriodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Period");
                });

            modelBuilder.Entity("kabinizer_data.Entities.PeriodEntity", b =>
                {
                    b.HasOne("kabinizer_data.DrawEntity", "Draw")
                        .WithMany("Periods")
                        .HasForeignKey("DrawId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("kabinizer_data.Entities.PeriodEntity", null)
                        .WithMany("Periods")
                        .HasForeignKey("PeriodEntityId");

                    b.Navigation("Draw");
                });

            modelBuilder.Entity("kabinizer_data.DrawEntity", b =>
                {
                    b.Navigation("Periods");
                });

            modelBuilder.Entity("kabinizer_data.Entities.PeriodEntity", b =>
                {
                    b.Navigation("Periods");
                });
#pragma warning restore 612, 618
        }
    }
}
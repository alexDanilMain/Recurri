﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CalendarEvent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("EndId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ExtendedPropertiesJson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Recurrence")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("StartId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Summary")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TemplateId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("EndId");

                    b.HasIndex("StartId");

                    b.HasIndex("TemplateId");

                    b.ToTable("CalendarEvents", (string)null);
                });

            modelBuilder.Entity("EventDateTime", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TimeZone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EventDateTimes", (string)null);
                });

            modelBuilder.Entity("Template", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Templates", (string)null);
                });

            modelBuilder.Entity("CalendarEvent", b =>
                {
                    b.HasOne("EventDateTime", "End")
                        .WithMany()
                        .HasForeignKey("EndId");

                    b.HasOne("EventDateTime", "Start")
                        .WithMany()
                        .HasForeignKey("StartId");

                    b.HasOne("Template", null)
                        .WithMany("Events")
                        .HasForeignKey("TemplateId");

                    b.Navigation("End");

                    b.Navigation("Start");
                });

            modelBuilder.Entity("Template", b =>
                {
                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}

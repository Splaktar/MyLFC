﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using MyLiverpool.Data.Common;
using MyLiverpool.Data.ResourceAccess;
using System;

namespace MyLiverpool.Data.ResourceAccess.Migrations
{
    [DbContext(typeof(LiverpoolContext))]
    partial class LiverpoolContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ChatMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("AdditionTime");

                    b.Property<int>("AuthorId");

                    b.Property<string>("Ip")
                        .HasMaxLength(15);

                    b.Property<string>("Message");

                    b.Property<byte>("Type");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Club", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EnglishName");

                    b.Property<string>("Logo");

                    b.Property<string>("Name");

                    b.Property<int>("StadiumId");

                    b.Property<string>("StadiumName");

                    b.HasKey("Id");

                    b.HasIndex("StadiumId");

                    b.ToTable("Clubs");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.CommentVote", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("CommentId");

                    b.Property<bool>("Positive");

                    b.HasKey("UserId", "CommentId");

                    b.HasIndex("CommentId");

                    b.ToTable("CommentVotes");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("AdditionTime");

                    b.Property<int>("AuthorId");

                    b.Property<bool>("IsFirstMessage");

                    b.Property<DateTimeOffset>("LastModifiedTime");

                    b.Property<string>("Message");

                    b.Property<int>("OldId");

                    b.Property<int>("ThemeId");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("ThemeId");

                    b.ToTable("ForumMessages");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumSection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("IdOld");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ForumSections");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumSubsection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnswersCount");

                    b.Property<string>("Description");

                    b.Property<int>("IdOld");

                    b.Property<string>("Name");

                    b.Property<int>("SectionId");

                    b.Property<int>("Views");

                    b.HasKey("Id");

                    b.HasIndex("SectionId");

                    b.ToTable("ForumSubsections");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumTheme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Answers");

                    b.Property<int>("AuthorId");

                    b.Property<string>("Description");

                    b.Property<int>("IdOld");

                    b.Property<bool>("IsClosed");

                    b.Property<bool>("IsPool");

                    b.Property<int>("LastAnswerUserId");

                    b.Property<DateTimeOffset?>("LastMessageAdditionTime");

                    b.Property<string>("Name");

                    b.Property<bool>("OnTop");

                    b.Property<int>("SubsectionId");

                    b.Property<int>("Views");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("LastAnswerUserId");

                    b.HasIndex("SubsectionId");

                    b.ToTable("ForumThemes");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.HelpEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Type");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("HelpEntities");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Injury", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<DateTime>("EndTime");

                    b.Property<int>("PersonId");

                    b.Property<DateTime>("StartTime");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("Injuries");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Loan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Came");

                    b.Property<int>("ClubId");

                    b.Property<DateTime>("EndTime");

                    b.Property<int>("PersonId");

                    b.Property<DateTime>("StartTime");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.HasIndex("PersonId");

                    b.ToTable("Loans");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Match", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClubId");

                    b.Property<DateTimeOffset>("DateTime");

                    b.Property<bool>("IsHome");

                    b.Property<int>("MatchType");

                    b.Property<string>("PhotoUrl");

                    b.Property<string>("ReportUrl");

                    b.Property<string>("Score");

                    b.Property<int>("SeasonId");

                    b.Property<int>("StadiumId");

                    b.Property<string>("VideoUrl");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.HasIndex("SeasonId");

                    b.HasIndex("StadiumId");

                    b.ToTable("Matches");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MatchEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Home");

                    b.Property<bool>("IsOur");

                    b.Property<int>("MatchId");

                    b.Property<byte?>("Minute");

                    b.Property<int>("PersonId");

                    b.Property<int>("SeasonId");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("MatchId");

                    b.HasIndex("PersonId");

                    b.HasIndex("SeasonId");

                    b.ToTable("MatchEvents");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MatchPerson", b =>
                {
                    b.Property<int>("MatchId");

                    b.Property<int>("PersonId");

                    b.Property<int>("PersonType");

                    b.HasKey("MatchId", "PersonId");

                    b.HasIndex("PersonId");

                    b.ToTable("MatchPersons");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Material", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("AdditionTime");

                    b.Property<int>("AuthorId");

                    b.Property<string>("Brief");

                    b.Property<bool>("CanCommentary");

                    b.Property<int>("CategoryId");

                    b.Property<DateTimeOffset>("LastModified");

                    b.Property<string>("Message");

                    b.Property<int>("OldId");

                    b.Property<bool>("OnTop");

                    b.Property<bool>("Pending");

                    b.Property<string>("PhotoPath");

                    b.Property<float>("Rating");

                    b.Property<int>("RatingNumbers");

                    b.Property<int>("RatingSumm");

                    b.Property<int>("Reads");

                    b.Property<string>("Source");

                    b.Property<string>("Title");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Materials");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MaterialCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("MaterialType");

                    b.Property<string>("Name");

                    b.Property<int>("OldId");

                    b.HasKey("Id");

                    b.ToTable("MaterialCategories");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MaterialComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("AdditionTime");

                    b.Property<string>("Answer");

                    b.Property<int>("AuthorId");

                    b.Property<bool>("IsVerified");

                    b.Property<DateTimeOffset>("LastModified");

                    b.Property<int?>("MatchId");

                    b.Property<int?>("MaterialId");

                    b.Property<string>("Message");

                    b.Property<int>("OldId");

                    b.Property<int?>("OldParentId");

                    b.Property<int?>("ParentId");

                    b.Property<bool>("Pending");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("MatchId");

                    b.HasIndex("MaterialId");

                    b.HasIndex("ParentId");

                    b.ToTable("MaterialComments");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("DateTime");

                    b.Property<int?>("EntityId");

                    b.Property<bool>("IsRead");

                    b.Property<string>("Text");

                    b.Property<int>("Type");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset?>("Birthday");

                    b.Property<string>("Country");

                    b.Property<string>("FirstName");

                    b.Property<string>("FirstRussianName");

                    b.Property<string>("LastName");

                    b.Property<string>("LastRussianName");

                    b.Property<byte?>("Number");

                    b.Property<string>("Photo");

                    b.Property<string>("Position");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.PrivateMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsRead");

                    b.Property<string>("Message")
                        .HasMaxLength(2500);

                    b.Property<int>("ReceiverId");

                    b.Property<int>("SenderId");

                    b.Property<DateTimeOffset>("SentTime");

                    b.Property<string>("Title")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("PrivateMessages");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.RoleGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("RussianName");

                    b.HasKey("Id");

                    b.ToTable("RoleGroups");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.RoleRoleGroup", b =>
                {
                    b.Property<int>("RoleId");

                    b.Property<int>("RoleGroupId");

                    b.HasKey("RoleId", "RoleGroupId");

                    b.HasIndex("RoleGroupId");

                    b.ToTable("RoleRoleGroups");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Season", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("StartSeasonYear");

                    b.HasKey("Id");

                    b.ToTable("Seasons");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Stadium", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Stadiums");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Transfer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Amount");

                    b.Property<int?>("ClubId");

                    b.Property<bool>("Coming");

                    b.Property<DateTimeOffset?>("FinishDate");

                    b.Property<bool>("OnLoan");

                    b.Property<int>("PersonId");

                    b.Property<int?>("SeasonId");

                    b.Property<DateTimeOffset>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.HasIndex("PersonId");

                    b.HasIndex("SeasonId");

                    b.ToTable("Transfers");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<DateTimeOffset?>("Birthday");

                    b.Property<string>("City");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Country");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FullName");

                    b.Property<bool>("Gender");

                    b.Property<string>("Homepage");

                    b.Property<string>("Ip");

                    b.Property<DateTimeOffset>("LastModified");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<int>("OldId");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("Photo");

                    b.Property<DateTimeOffset>("RegistrationDate");

                    b.Property<int>("RoleGroupId");

                    b.Property<string>("SecurityStamp");

                    b.Property<string>("Skype");

                    b.Property<string>("Title");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("RoleGroupId");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.UserConfig", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<bool>("IsPmToEmailNotifyEnabled");

                    b.Property<bool>("IsReplyToEmailEnabled");

                    b.Property<bool>("IsReplyToPmEnabled");

                    b.HasKey("UserId");

                    b.ToTable("UserConfigs");
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Wish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Message");

                    b.Property<int>("State");

                    b.Property<string>("Title")
                        .HasMaxLength(30);

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Wishes");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictApplication<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClientId");

                    b.Property<string>("ClientSecret");

                    b.Property<string>("DisplayName");

                    b.Property<string>("LogoutRedirectUri");

                    b.Property<string>("RedirectUri");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .IsUnique()
                        .HasFilter("[ClientId] IS NOT NULL");

                    b.ToTable("OpenIddictApplications");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictAuthorization<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ApplicationId");

                    b.Property<string>("Scope");

                    b.Property<string>("Status");

                    b.Property<string>("Subject");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.ToTable("OpenIddictAuthorizations");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictScope<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("OpenIddictScopes");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictToken<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ApplicationId");

                    b.Property<int?>("AuthorizationId");

                    b.Property<string>("Ciphertext");

                    b.Property<DateTimeOffset?>("CreationDate");

                    b.Property<DateTimeOffset?>("ExpirationDate");

                    b.Property<string>("Hash");

                    b.Property<string>("Status");

                    b.Property<string>("Subject");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("AuthorizationId");

                    b.HasIndex("Hash")
                        .IsUnique()
                        .HasFilter("[Hash] IS NOT NULL");

                    b.ToTable("OpenIddictTokens");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ChatMessage", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "Author")
                        .WithMany("ChatMessages")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Club", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Stadium", "Stadium")
                        .WithMany("Clubs")
                        .HasForeignKey("StadiumId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.CommentVote", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.MaterialComment", "Comment")
                        .WithMany("CommentVotes")
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.User", "User")
                        .WithMany("CommentVotes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumMessage", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "Author")
                        .WithMany("ForumMessages")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.ForumTheme", "Theme")
                        .WithMany("Messages")
                        .HasForeignKey("ThemeId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumSubsection", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.ForumSection", "Section")
                        .WithMany("Subsections")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.ForumTheme", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.User", "LastAnswerUser")
                        .WithMany()
                        .HasForeignKey("LastAnswerUserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.ForumSubsection", "Subsection")
                        .WithMany("Themes")
                        .HasForeignKey("SubsectionId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Injury", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Person", "Person")
                        .WithMany("Injuries")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Loan", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Club", "Club")
                        .WithMany("Loans")
                        .HasForeignKey("ClubId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Person", "Person")
                        .WithMany("Loans")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Match", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Club", "Club")
                        .WithMany("Matches")
                        .HasForeignKey("ClubId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Season", "Season")
                        .WithMany("Matches")
                        .HasForeignKey("SeasonId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Stadium", "Stadium")
                        .WithMany("Matches")
                        .HasForeignKey("StadiumId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MatchEvent", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Match", "Match")
                        .WithMany("Events")
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Person", "Person")
                        .WithMany("Events")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Season", "Season")
                        .WithMany("Events")
                        .HasForeignKey("SeasonId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MatchPerson", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Match", "Match")
                        .WithMany("Persons")
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Person", "Person")
                        .WithMany("Matches")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Material", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "Author")
                        .WithMany("Materials")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.MaterialCategory", "Category")
                        .WithMany("Materials")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.MaterialComment", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "Author")
                        .WithMany("Comments")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Match", "Match")
                        .WithMany("Comments")
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Material", "Material")
                        .WithMany("Comments")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.MaterialComment", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Notification", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.PrivateMessage", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "Receiver")
                        .WithMany("ReceivedPrivateMessages")
                        .HasForeignKey("ReceiverId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.User", "Sender")
                        .WithMany("SentPrivateMessages")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.RoleRoleGroup", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.RoleGroup", "RoleGroup")
                        .WithMany("RoleGroups")
                        .HasForeignKey("RoleGroupId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Role", "Role")
                        .WithMany("RoleRoleGroups")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.Transfer", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.Club", "Club")
                        .WithMany("Transfers")
                        .HasForeignKey("ClubId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Person", "Person")
                        .WithMany("Transfers")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MyLiverpool.Data.Entities.Season", "Season")
                        .WithMany()
                        .HasForeignKey("SeasonId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.User", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.RoleGroup", "RoleGroup")
                        .WithMany("Users")
                        .HasForeignKey("RoleGroupId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MyLiverpool.Data.Entities.UserConfig", b =>
                {
                    b.HasOne("MyLiverpool.Data.Entities.User", "User")
                        .WithOne("UserConfig")
                        .HasForeignKey("MyLiverpool.Data.Entities.UserConfig", "UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictAuthorization<int>", b =>
                {
                    b.HasOne("OpenIddict.Models.OpenIddictApplication<int>", "Application")
                        .WithMany("Authorizations")
                        .HasForeignKey("ApplicationId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictToken<int>", b =>
                {
                    b.HasOne("OpenIddict.Models.OpenIddictApplication<int>", "Application")
                        .WithMany("Tokens")
                        .HasForeignKey("ApplicationId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("OpenIddict.Models.OpenIddictAuthorization<int>", "Authorization")
                        .WithMany("Tokens")
                        .HasForeignKey("AuthorizationId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}

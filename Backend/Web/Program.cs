
using Application.Dtos;
using Application.Profiles;
using Application.Services;
using Application.Validators;
using Common;
using Domain.Repositories;
using FluentValidation;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using Web.Middlewares;

namespace Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddLogging(logging => logging.AddConsole());

            builder.Services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        IssuerSigningKey = AuthConfig.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true,
                    };
                });

            builder.Services
                .AddScoped<IUserRepository, UserRepository>()
                .AddTransient<UserService>()
                .AddScoped<IValidator<UserRegistrationDto>, UserRegistrationValidator>()
                .AddScoped<IValidator<UserUpdateDto>, UserUpdateValidator>()
                .AddAutoMapper(typeof(UserMapProfile))
                
                .AddScoped<IGroupRepository, GroupRepository>()
                .AddTransient<GroupService>()
                .AddScoped<IValidator<GroupCreateUpdateDto>, GroupCreateValidator>()
                .AddAutoMapper(typeof(GroupMapProfile))
                
                .AddScoped<IStudentApplicationRepository, StudentApplicationRepository>()
                //.AddTransient<StudentApplicationService>()
                .AddScoped<IValidator<StudentApplicationCreateUpdateDto>, StudentApplicationCreateUpdateValidator>()
                .AddAutoMapper(typeof(StudentApplicationMapProfile));


            builder.Services
                .AddSingleton(new JWTService(AuthConfig.GetSymmetricSecurityKey(), AuthConfig.LIFETIME_MINUTES));

            builder.Services.AddAuthorization();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(config =>
            {
                config.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                config.OperationFilter<SwaggerAuthorizeFilter>();
            });

            builder.Services.AddDbContext<ApplicationContext>(
                    options => options
                    .UseLazyLoadingProxies()
                    .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
                    builder => builder.MigrationsAssembly("Web")
                ));

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<ApplicationContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }

            //if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ExceptionCatchMiddleware>();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
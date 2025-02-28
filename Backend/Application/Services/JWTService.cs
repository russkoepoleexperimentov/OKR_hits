﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services
{
    public class JWTService
    {
        private readonly int _lifetimeMinutes;
        private readonly SymmetricSecurityKey _secretKey;

        public JWTService(SymmetricSecurityKey secretKey, int lifetimeMinutes)
        {
            _secretKey = secretKey;
            _lifetimeMinutes = lifetimeMinutes;
        }

        public string GenerateToken(User user)
        {
            var handler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity([
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString()),
                    ]),
                Expires = DateTime.UtcNow.AddMinutes(_lifetimeMinutes),
                SigningCredentials = new SigningCredentials(_secretKey,
                SecurityAlgorithms.HmacSha256Signature)
            };

            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }
    }

}


using Application.Dtos;
using Domain.Entities;
using FluentValidation;

namespace Application.Validators
{
    public class StudentApplicationCreateUpdateValidator : AbstractValidator<StudentApplicationCreateUpdateDto>
    {
        public StudentApplicationCreateUpdateValidator() 
        {
            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description must be less than 500 characters long.");

            RuleFor(x => x.StartDate)
                .Must((dto, field) => field <= dto.EndDate).WithMessage("Start date must be less or equal than End date.");

            RuleFor(x => x.EndDate)
                .Must((dto, field) => field >= dto.StartDate).WithMessage("End date must be greater or equal than Start date.");
        }
    }
}

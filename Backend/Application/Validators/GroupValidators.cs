
using Application.Dtos;
using FluentValidation;

namespace Application.Validators
{
    public class GroupCreateValidator : AbstractValidator<GroupCreateUpdateDto>
    {
        public GroupCreateValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name field is required.");

        }

    }
}

using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(
                    destination => destination.Username, 
                    options => options.MapFrom(source => source.AppUser.UserName)
                )
                .ForMember(
                    d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName)
                )
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(
                    x => x.IsMain
                ).Url))
                .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());

        }
    }
}
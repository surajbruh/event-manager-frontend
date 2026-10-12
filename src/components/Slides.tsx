import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { formatEventDate } from "../config/formatDate";
import { useNavigate } from "react-router";
import { useEvent } from "../service/events/useEvent";

export default function Slides() {
  const { state } = useEvent();
  const navigate = useNavigate();

  function handleNavigation(eventId: string) {
    navigate(`/events/${eventId}`);
  }

  return (
    <section aria-label="Featured events">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // navigation
        // pagination={{ clickable: true }}
        loop
        className="relative h-[50vh] max-h-200 min-h-80 w-full sm:h-[55vh] md:h-[65vh]"
      >
        {state.events.map((event) => (
          <SwiperSlide key={event._id} className="relative">
            <figure className="absolute inset-0 -z-20 ">
              <img
                src={event.image || "/image.jpg"}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </figure>
            <div className="bg-black/25 w-full h-full">
              <article className="mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-12 lg:pb-16 xl:pb-20">
                <header className="mb-5 max-w-4xl leading-tight text-white">
                  <time
                    dateTime={event.startDate.toString()}
                    className="text-xs uppercase sm:text-sm md:text-base"
                  >
                    {formatEventDate(event.startDate.toString()).compact}
                  </time>

                  <h2 className="text-2xl font-semibold uppercase sm:text-3xl md:text-4xl lg:text-5xl">
                    {event.title}
                  </h2>

                  <p className="text-base capitalize sm:text-lg md:text-xl">
                    {event.location}
                  </p>
                </header>

                <button
                  type="button"
                  onClick={() => handleNavigation(event._id)}
                  className="w-fit bg-black  border-gray-300 border-2 px-3 py-3 text-sm uppercase text-white hover:underline sm:text-base md:text-lg"
                  aria-label={`Book ${event.title}`}
                >
                  Book event
                </button>
              </article>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default function WeatherStat({ animation, icon, title, value }) {
  const { type, duration, easing } = animation;
  return (
    <div
      data-aos={type}
      data-aos-duration={duration}
      data-aos-easing={easing}
      data-aos-anchor-placement="top-bottom"
      className="d-flex align-items-center justify-content-between bottomborder pt6"
    >
      <div className="d-flex align-items-center gap-2">
        <img src={icon} alt="Icon" />
        <h3 className="stattitle m-0">{title}</h3>
      </div>
      <p className="m-0 color-secondary">{value}</p>
    </div>
  );
}

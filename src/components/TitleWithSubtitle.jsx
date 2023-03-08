export default function TitleWithSubtitle({ animation, title, subtitle }) {
  const { type, duration, easing, className } = animation;
  return (
    <div
      data-aos={type}
      data-aos-duration={duration}
      data-aos-easing={easing}
      className={className}
      data-aos-anchor-placement="top-bottom"
    >
      <h3 className="font-title mb-1">{title}</h3>
      <p className="color-secondary">{subtitle}</p>
    </div>
  );
}

import { Link } from "react-router-dom";
import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";

export default function Favorites({ favorites, onToggleFavorite }) {
	const savedServices = services.filter((service) => favorites.includes(service.id));

	return (
		<div className="services-page">
			<div className="services-header">
				<div className="services-header__inner">
					<div className="services-header__meta">
						<span className="services-header__label">SAVED</span>
						<span className="services-header__count">{savedServices.length} FAVORITES</span>
					</div>
					<h1 className="services-header__title">Saved emergency contacts</h1>
					<p className="services-header__sub">
						Keep the services you trust one tap away for faster calling during an emergency.
					</p>
				</div>
			</div>

			<div className="services-body" style={{ gridTemplateColumns: "1fr" }}>
				{savedServices.length > 0 ? (
					<div className="services-grid">
						{savedServices.map((service) => (
							<ServiceCard
								key={service.id}
								service={service}
								isFavorite={favorites.includes(service.id)}
								onToggleFavorite={onToggleFavorite}
							/>
						))}
					</div>
				) : (
					<div className="services-empty">
						<div className="services-empty__icon">★</div>
						<h3 className="services-empty__title">No saved services yet</h3>
						<p className="services-empty__sub">Browse the directory and tap the star on any verified service.</p>
						<Link to="/services" className="cta-banner__btn" style={{ marginTop: 18, display: "inline-flex" }}>
							Browse services →
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

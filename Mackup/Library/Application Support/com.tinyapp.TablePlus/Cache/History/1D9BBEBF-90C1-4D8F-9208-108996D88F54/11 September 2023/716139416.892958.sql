CREATE TABLE IF NOT EXISTS das_db.whitelabeling (
	id uuid NOT NULL,
	product_name character varying COLLATE pg_catalog. "default",
	footer_copyright character varying COLLATE pg_catalog. "default",
	company_url character varying COLLATE pg_catalog. "default",
	company_name character varying COLLATE pg_catalog. "default",
	logo_light_format character varying COLLATE pg_catalog. "default",
	logo_light bytea,
	logo_dark_format character varying COLLATE pg_catalog. "default",
	logo_dark bytea,
	create_datetime bigint,
	update_datetime bigint,
	CONSTRAINT whitelabeling_pkey PRIMARY KEY (id)
);
CREATE TABLE das_db.distribution_list
(
    id   		 UUID     NOT NULL PRIMARY KEY, 
    tenant_id        	 UUID     NOT NULL,
    name                 VARCHAR  NOT NULL,
    description          VARCHAR,
    list_type            SMALLINT NOT NULL,
    url                  VARCHAR,
    emails               VARCHAR[],
    min_severity         SMALLINT NOT NULL,
    enabled              BOOLEAN NOT NULL,
    create_datetime      BIGINT,
    update_datetime      BIGINT,
    UNIQUE (tenant_id, id),
    UNIQUE (tenant_id, name)
);
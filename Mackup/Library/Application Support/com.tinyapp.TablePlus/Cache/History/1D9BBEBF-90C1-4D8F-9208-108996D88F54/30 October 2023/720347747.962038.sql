SELECT
	*
FROM
	"das_db"."notification"
	LEFT JOIN (
		SELECT
			*
		FROM (
			SELECT
				"device_id",
				"ip_address",
				"hostname",
				row_number() OVER (PARTITION BY "device_id" ORDER BY "update_datetime" DESC) AS "rn"
			FROM
				"das_db"."device_status") AS "inner_sq"
		WHERE
			"rn" = 1) AS "ds" ON "ds"."device_id" = "das_db"."notification"."device_id"
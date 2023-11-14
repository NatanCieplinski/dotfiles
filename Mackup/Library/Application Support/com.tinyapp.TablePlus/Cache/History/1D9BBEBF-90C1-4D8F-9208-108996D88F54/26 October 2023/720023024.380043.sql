SELECT
	*
FROM
	"das_db"."notification"
	LEFT JOIN (
		SELECT
			*
		FROM (
			SELECT
				"das_db"."device_status"."device_id" AS "status_device_id",
				"das_db"."device_status"."ip_address",
				"das_db"."device_status"."hostname",
				"das_db"."device_status"."update_datetime",
				ROW_NUMBER() OVER (PARTITION BY "das_db"."device_status"."device_id" ORDER BY "das_db"."device_status"."update_datetime" DESC) rn
			FROM
				"das_db"."device_status") sq
		WHERE
			sq.rn = 1) AS "ds" ON "ds"."status_device_id" = "das_db"."notification"."device_id"
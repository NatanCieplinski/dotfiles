SELECT
	*
FROM
	"das_db"."notification"
	LEFT JOIN (
		SELECT
			"das_db"."device_status"."device_id" AS "status_device_id",
			"das_db"."device_status"."ip_address",
			"das_db"."device_status"."hostname",
			MAX(das_db.device_status.update_datetime) AS "max_updated_datetime"
		FROM
			"das_db"."device_status"
		GROUP BY
			"das_db"."device_status"."device_id",
			"das_db"."device_status"."ip_address",
			"das_db"."device_status"."hostname") AS "ds" ON "ds"."status_device_id" = "das_db"."notification"."device_id"
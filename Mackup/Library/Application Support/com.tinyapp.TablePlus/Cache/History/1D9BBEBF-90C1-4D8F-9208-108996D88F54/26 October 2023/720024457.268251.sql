SELECT
	*
FROM
	"das_db"."notification"
	LEFT JOIN (
		SELECT
			"das_db"."device_status"."device_id" AS "status_device_id",
			"das_db"."device_status"."ip_address",
			"das_db"."device_status"."hostname",
			row_number() OVER (PARTITION BY "device_id" ORDER BY "update_datetime" DESC) AS "rn"
		FROM
			"das_db"."device_status") AS "ds" ON "ds"."status_device_id" = "das_db"."notification"."device_id"
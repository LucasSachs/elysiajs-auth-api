CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`username` text NOT NULL UNIQUE,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);

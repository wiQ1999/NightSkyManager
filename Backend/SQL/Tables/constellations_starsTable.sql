CREATE TABLE [constellations_stars] 
(
	[constellationId] INT NOT NULL,
    [starId] INT NOT NULL,
	PRIMARY KEY ([constellationId], [starId]),
	FOREIGN KEY ([constellationId]) REFERENCES [constellations] ([id]) ON DELETE CASCADE,
	FOREIGN KEY ([starId]) REFERENCES [stars] ([id]) ON DELETE CASCADE
);
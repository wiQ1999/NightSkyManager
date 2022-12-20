CREATE TABLE [Stars_Constellations] 
(
    [StarId] INT NOT NULL,
	[ConstellationId] INT NOT NULL,
	PRIMARY KEY ([StarId], [ConstellationId]),
	FOREIGN KEY ([StarId]) REFERENCES [Stars] ([Id]) ON DELETE CASCADE,
	FOREIGN KEY ([ConstellationId]) REFERENCES [Constellations] ([Id]) ON DELETE CASCADE

);
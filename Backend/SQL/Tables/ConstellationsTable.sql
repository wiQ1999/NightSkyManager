CREATE TABLE [Constellations] 
(
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Name] VARCHAR(255) NOT NULL,
    [Description] VARCHAR(MAX),
    [Link] VARCHAR(255) NULL
);
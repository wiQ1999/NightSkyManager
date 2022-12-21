CREATE TABLE [constellations] 
(
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [description] VARCHAR(MAX) NULL,
    [link] VARCHAR(255) NULL
);
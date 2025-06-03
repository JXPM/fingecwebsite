-- Base de données pour le système de newsletter
CREATE DATABASE fingec_newsletter;
USE fingec_newsletter;


--Table pour stocker les abonnés à la newsletter
CREATE TABLE newsletter_subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    telephone VARCHAR(20),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('actif', 'inactif', 'suspendu') DEFAULT 'actif',
    source VARCHAR(50) DEFAULT 'website', -- source peut être 'base-documentation' ou 'vie-cabinet'
    token_desabonnement VARCHAR(255) UNIQUE,
    preferences_notifications JSON,
    derniere_activite TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_statut (statut),
    INDEX idx_source (source)
);


-- Table pour les campagnes d'emails
CREATE TABLE newsletter_campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT,
    contenu_html LONGTEXT,
    sujet VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_envoi TIMESTAMP NULL,
    statut ENUM('brouillon', 'programmee', 'envoyee', 'annulee') DEFAULT 'brouillon',
    type_campagne ENUM('newsletter', 'notification', 'actualite') DEFAULT 'newsletter',
    cible_source VARCHAR(50), -- pour cibler une section spécifique
    nombre_destinataires INT DEFAULT 0,
    INDEX idx_statut (statut),
    INDEX idx_date_envoi (date_envoi)
);

-- Table pour tracker les envois individuels
CREATE TABLE newsletter_envois (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT,
    subscriber_id INT,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('envoye', 'echec', 'bounce', 'ouvert', 'clique') DEFAULT 'envoye',
    date_ouverture TIMESTAMP NULL,
    date_clic TIMESTAMP NULL,
    erreur_message TEXT,
    FOREIGN KEY (campaign_id) REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
    FOREIGN KEY (subscriber_id) REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
    INDEX idx_campaign (campaign_id),
    INDEX idx_subscriber (subscriber_id),
    INDEX idx_statut (statut)
);

-- Table pour les notifications push
CREATE TABLE push_notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subscriber_id INT,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    url VARCHAR(500),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_envoi TIMESTAMP NULL,
    statut ENUM('en_attente', 'envoye', 'echec', 'lu') DEFAULT 'en_attente',
    device_token VARCHAR(500),
    FOREIGN KEY (subscriber_id) REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
    INDEX idx_subscriber (subscriber_id),
    INDEX idx_statut (statut)
);

-- Table pour les templates d'emails
CREATE TABLE email_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    sujet VARCHAR(255),
    contenu_html LONGTEXT,
    variables_disponibles JSON,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actif BOOLEAN DEFAULT TRUE
);

-- Insertion de données exemple
INSERT INTO email_templates (nom, sujet, contenu_html, variables_disponibles) VALUES
('confirmation_inscription', 'Confirmation d''inscription à notre newsletter',
'<h2>Bienvenue {{prenom}} !</h2><p>Merci de vous être inscrit à notre newsletter. Vous recevrez nos dernières actualités juridiques.</p><p><a href="{{lien_desabonnement}}">Se désabonner</a></p>',
'["prenom", "email", "lien_desabonnement"]'),

('newsletter_actualites', 'Nos dernières actualités juridiques',
'<h1>Newsletter FINGEC</h1><div>{{contenu_actualites}}</div><p><a href="{{lien_desabonnement}}">Se désabonner</a></p>',
'["contenu_actualites", "lien_desabonnement"]');

-- Procédure stockée pour ajouter un abonné
DELIMITER //
CREATE PROCEDURE AjouterAbonne(
    IN p_email VARCHAR(255),
    IN p_nom VARCHAR(100),
    IN p_prenom VARCHAR(100),
    IN p_telephone VARCHAR(20),
    IN p_source VARCHAR(50))
BEGIN
    DECLARE v_token VARCHAR(255);
    SET v_token = SHA2(CONCAT(p_email, NOW(), RAND()), 256);
    
    INSERT INTO newsletter_subscribers (email, nom, prenom, telephone, source, token_desabonnement)
    VALUES (p_email, p_nom, p_prenom, p_telephone, p_source, v_token)
    ON DUPLICATE KEY UPDATE
        derniere_activite = CURRENT_TIMESTAMP,
        statut = 'actif';
        
    SELECT LAST_INSERT_ID() AS subscriber_id, v_token AS token;
END //
DELIMITER ;

-- Vue pour statistiques
CREATE VIEW vue_statistiques_newsletter AS
SELECT
    COUNT(*) AS total_abonnes,
    COUNT(CASE WHEN statut = 'actif' THEN 1 END) AS abonnes_actifs,
    COUNT(CASE WHEN source = 'base-documentation' THEN 1 END) AS abonnes_base_doc,
    COUNT(CASE WHEN source = 'vie-cabinet' THEN 1 END) AS abonnes_vie_cabinet,
    COUNT(CASE WHEN DATE(date_inscription) = CURDATE() THEN 1 END) AS nouveaux_aujourd_hui,
    COUNT(CASE WHEN date_inscription >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) AS nouveaux_semaine
FROM newsletter_subscribers;
// fingec-website/src/app/admin/newsletters/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';

export default function NewsletterAdmin() {
  const [formData, setFormData] = useState({
    titre: '',
    sujet: '',
    contenu: '',
    contenu_html: '',
    type_campagne: 'newsletter',
    cible_source: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter/campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Campagne envoyée à ${result.destinataires} abonnés`);
        setFormData({
          titre: '',
          sujet: '',
          contenu: '',
          contenu_html: '',
          type_campagne: 'newsletter',
          cible_source: ''
        });
      } else {
        toast.error(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Créer une campagne newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="titre" className="block mb-2">Titre de la campagne</label>
              <Input
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="sujet" className="block mb-2">Sujet de l'email</label>
              <Input
                id="sujet"
                name="sujet"
                value={formData.sujet}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="contenu" className="block mb-2">Contenu texte</label>
              <Textarea
                id="contenu"
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <div>
              <label htmlFor="contenu_html" className="block mb-2">Contenu HTML</label>
              <Textarea
                id="contenu_html"
                name="contenu_html"
                value={formData.contenu_html}
                onChange={handleChange}
                rows={10}
                required
              />
              <p className="text-sm text-muted-foreground mt-2">
                Vous pouvez utiliser {"{{prenom}}"}, {"{{email}}"} et {"{{lien_desabonnement}}"} comme variables
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="type_campagne" className="block mb-2">Type de campagne</label>
                <Input
                  id="type_campagne"
                  name="type_campagne"
                  value={formData.type_campagne}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="cible_source" className="block mb-2">Cible (source)</label>
                <Input
                  id="cible_source"
                  name="cible_source"
                  value={formData.cible_source}
                  onChange={handleChange}
                  placeholder="base-documentation ou vide pour tous"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer la campagne'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
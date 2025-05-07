"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  phone: z.string().min(8, {
    message: "Veuillez entrer un numéro de téléphone valide",
  }),
  position: z.string().min(2, {
    message: "Veuillez préciser le poste",
  }),
  experience: z.string().min(2, {
    message: "Veuillez indiquer votre expérience",
  }),
  message: z.string().min(10, {
    message: "Votre lettre de motivation doit contenir au moins 10 caractères",
  }),
  resume: z.string().optional(),
});

interface ApplicationFormProps {
  defaultPosition?: string;
  isSpontaneous?: boolean;
}

const ApplicationForm = ({ defaultPosition = '', isSpontaneous = false }: ApplicationFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: defaultPosition,
      experience: "",
      message: "",
      resume: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setSubmitError(`Le fichier "${file.name}" est trop volumineux. La taille maximale autorisée est de 5MB.`);
      return;
    }

    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setSubmitError(`Le type de fichier "${fileExtension}" n'est pas autorisé. Les formats acceptés sont PDF, DOC et DOCX.`);
      return;
    }

    setSubmitError(null);
    setResumeFile(file);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('position', values.position);
      formData.append('experience', values.experience);
      formData.append('message', values.message);

      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const response = await fetch('/api/application', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi de la candidature');
      }

      setIsSubmitted(true);
      form.reset();
      setResumeFile(null);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la candidature:", error);
      setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi de la candidature. Veuillez réessayer plus tard ou nous contacter par téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="p-8 bg-green-50 rounded-lg text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-700 mb-2">Candidature envoyée avec succès !</h3>
        <p className="text-green-600 mb-6">
          Merci pour votre candidature. Elle a été transmise à notre service des ressources humaines qui l'étudiera avec attention et vous recontactera dans les meilleurs délais si votre profil correspond à nos besoins.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
        >
          Envoyer une nouvelle candidature
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {submitError}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom *</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="jean.dupont@exemple.fr" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone *</FormLabel>
                <FormControl>
                  <Input placeholder="06 12 34 56 78" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poste recherché *</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    isSpontaneous 
                      ? "Ex: Comptable, Assistant comptable, etc." 
                      : "Sélectionnez un poste dans nos offres"
                  }
                  {...field}
                  readOnly={!isSpontaneous && !!defaultPosition}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expérience *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 3 ans dans un cabinet d'expertise comptable" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lettre de motivation *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Présentez-vous et expliquez-nous pourquoi vous souhaitez rejoindre notre cabinet..."
                  className="h-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV (PDF) *</FormLabel>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      handleFileChange(e);
                      if (e.target.files?.[0]) {
                        field.onChange(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="resume-upload"
                  />
                  <div className="border rounded-md p-3 flex items-center justify-between cursor-pointer bg-muted/30"
                    onClick={() => document.getElementById("resume-upload")?.click()}>
                    <span className="text-muted-foreground">
                      {resumeFile ? resumeFile.name : "Sélectionner votre CV"}
                    </span>
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                {resumeFile && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResumeFile(null);
                      field.onChange("");
                    }}
                  >
                    Supprimer
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Formats acceptés: PDF, DOC, DOCX (max 5MB)
              </p>
              <p className="text-xs text-green-600 mt-1">
                Votre CV sera envoyé et stocké de manière sécurisée. Il sera accessible uniquement par notre service RH.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma candidature"
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          En soumettant ce formulaire, vous acceptez que les informations saisies soient utilisées dans
          le cadre de votre candidature. Conformément au RGPD, vous disposez d'un droit d'accès,
          de rectification et de suppression de vos données. Pour en savoir plus, consultez notre
          politique de confidentialité.
        </p>
      </form>
    </Form>
  );
};

export default ApplicationForm;
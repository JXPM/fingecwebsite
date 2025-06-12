// fingec-website/src/app/newsletter/unsubscribed/page.tsx
export default function UnsubscribedPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Désabonnement confirmé
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Vous avez été désabonné de notre newsletter avec succès.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Nous sommes désolés de vous voir partir. Vous pouvez vous réinscrire à tout moment.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
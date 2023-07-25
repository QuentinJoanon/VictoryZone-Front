import axiosInstance from './axiosInstance';
export async function createNewContact(form: FormData): Promise<boolean> {
  return axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/contact`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: form,
  })
    .then((response) => {
      if (response.status === 201) {
        return true;
      } else {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du formulaire."
        );
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

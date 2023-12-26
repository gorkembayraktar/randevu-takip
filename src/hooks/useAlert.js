
import { useSnackbar } from 'notistack';

export function useAlert() {

    const { enqueueSnackbar } = useSnackbar();

    const message = (variant, message) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });

        console.log(variant, message)
    };
    
    const variants = ["success", "danger"];
    return variants.reduce( (a, c) => ({...a, [c]: (m) => message(c, m)}), {});
  }
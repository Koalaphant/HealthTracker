import { useActionState } from "react";
import { submitForm } from "../actions/action";

export default function SingleForm({ option }) {
  const [state, formAction, pending] = useActionState(submitForm, null);

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto p-6 bg-purple-100 rounded-md shadow-md space-y-4 mb-8"
    >
      <h2 className="text-xl font-bold mb-4">{option}</h2>
      <input type="hidden" name="optionName" value={option} />
      <label className="block">
        <span className="block mb-1 font-semibold">Value</span>
        <input
          name="inputNumber"
          type="number"
          step="0.1"
          inputMode="decimal"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter decimal number"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 rounded transition ${
          pending
            ? "bg-purple-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {pending ? "Sending..." : "Send"}
      </button>
      {state?.message && (
        <p
          className={`mt-2 text-center text-sm ${
            state.error ? "text-red-600" : "text-green-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

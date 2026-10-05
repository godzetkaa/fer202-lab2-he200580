import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

const titles = () => within(screen.getByRole("list", { name: "Movies" }))
  .getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);

test("shows movie metadata and toggles theme, favorite, and details", () => {
  render(<App />);
  expect(screen.getAllByRole("listitem")).toHaveLength(6);
  const movie = screen.getAllByRole("listitem")[0];
  expect(within(movie).getByText("Sci-Fi")).toBeInTheDocument();
  expect(within(movie).getByText("2014")).toBeInTheDocument();
  expect(within(movie).getByText("8.7 / 10")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Dark" }));
  expect(screen.getByRole("main")).toHaveClass("dark");
  fireEvent.click(screen.getByRole("button", { name: "Light" }));
  expect(screen.getByRole("main")).toHaveClass("light");
  const favorite = within(movie).getByRole("button", { name: "Yêu thích" });
  const star = within(movie).getByRole("img", { name: "Not favorite" });
  expect(star.tagName).toBe("SPAN");
  fireEvent.click(star);
  expect(favorite).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(favorite);
  expect(favorite).toHaveAttribute("aria-pressed", "true");
  expect(star).toHaveClass("is-favorite");
  fireEvent.click(favorite);
  expect(favorite).toHaveAttribute("aria-pressed", "false");
  expect(star).not.toHaveClass("is-favorite");
  fireEvent.click(within(movie).getByRole("button", { name: "Chi tiết" }));
  const detail = screen.getByRole("region", { name: "Details for Interstellar" });
  expect(detail).toBeInTheDocument();
  expect(movie).not.toContainElement(detail);
  expect(within(detail).getByText("Christopher Nolan")).toBeInTheDocument();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close detail" }));
  expect(screen.queryByRole("region", { name: "Details for Interstellar" })).not.toBeInTheDocument();
  fireEvent.click(within(movie).getByRole("button", { name: "Interstellar" }));
  expect(screen.getByRole("region", { name: "Details for Interstellar" })).toBeInTheDocument();
});

test("search updates immediately and combines with genre; clear focuses input", () => {
  render(<App />);
  const search = screen.getByRole("searchbox");
  fireEvent.change(search, { target: { value: "  THE  " } });
  expect(titles()).toEqual(["The Dark Knight", "The Grand Budapest Hotel"]);
  fireEvent.change(screen.getByLabelText("Genre"), { target: { value: "Comedy" } });
  expect(titles()).toEqual(["The Grand Budapest Hotel"]);
  fireEvent.change(search, { target: { value: "Interstellar" } });
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(screen.getByText("Không tìm thấy")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Xóa" }));
  expect(search).toHaveFocus();
  expect(search).toHaveValue("");
  expect(titles()).toEqual(["The Grand Budapest Hotel"]);
});

test("rating sorting works on search results and default restores source order", () => {
  render(<App />);
  const sort = screen.getByLabelText("Sort by rating");
  fireEvent.change(sort, { target: { value: "descending" } });
  expect(titles()).toEqual(["The Dark Knight", "Interstellar", "Spirited Away", "Parasite", "Your Name", "The Grand Budapest Hotel"]);
  fireEvent.change(sort, { target: { value: "ascending" } });
  expect(titles()).toEqual(["The Grand Budapest Hotel", "Your Name", "Parasite", "Spirited Away", "Interstellar", "The Dark Knight"]);
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "the" } });
  expect(titles()).toEqual(["The Grand Budapest Hotel", "The Dark Knight"]);
  fireEvent.change(sort, { target: { value: "default" } });
  expect(titles()).toEqual(["The Dark Knight", "The Grand Budapest Hotel"]);
  fireEvent.click(screen.getByRole("button", { name: "Xóa" }));
  expect(titles()[0]).toBe("Interstellar");
});

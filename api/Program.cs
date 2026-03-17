var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

var items = new List<Item>
{
    new Item(1, "react", "client", "done", null),
    new Item(2, "c#", "server", "development", "some sample text for description"),
    new Item(3, "nextjs", "hybrid", "cancelled", "nextjs is server + client")
};
var nextId = items.Count > 0
    ? items.Max(x => x.Id) + 1
    : 1;

app.MapGet("/items", () => items);

app.MapGet("/items/{id}", (int id) =>
{
    var item = items.FirstOrDefault(x => x.Id == id);

    return item is not null ? Results.Ok(item) : Results.NotFound();
});

app.MapPost("/items", (Item item) =>
{
    var errors = ValidateItem(item);

    if (errors.Count > 0)
        return Results.ValidationProblem(errors);

    var newItem = item with { Id = nextId };
    nextId++;
    items.Add(newItem);

    return Results.Created($"/items/{newItem.Id}", newItem);
});

app.MapPut("/items/{id}", (int id, Item updated) =>
{
    var index = items.FindIndex(x => x.Id == id);

    if (index == -1)
        return Results.NotFound();

    var errors = ValidateItem(updated);

    if (errors.Count > 0)
        return Results.ValidationProblem(errors);

    var updatedItem = updated with { Id = id };

    items[index] = updatedItem;

    return Results.Ok(updatedItem);
});

app.MapDelete("/items/{id}", (int id) =>
{
    var item = items.FirstOrDefault(x => x.Id == id);

    if (item == null)
        return Results.NotFound();

    items.Remove(item);

    return Results.NoContent();
});

app.Run("http://localhost:4000");

static Dictionary<string, string[]> ValidateItem(Item item)
{
    var errors = new Dictionary<string, string[]>();

    if (string.IsNullOrWhiteSpace(item.Name))
        errors["name"] = ["Name is required."];

    if (string.IsNullOrWhiteSpace(item.Category))
        errors["category"] = ["Category is required."];

    if (string.IsNullOrWhiteSpace(item.Status))
        errors["status"] = ["Status is required."];

    return errors;
}

record Item(
    int Id,
    string Name,
    string Category,
    string Status,
    string? Description = null
);

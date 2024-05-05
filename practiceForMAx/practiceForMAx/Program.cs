using practiceForMAx.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IUserManagment, UserManagment>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
        builder.WithOrigins("http://localhost:55949") // Adjust the port if your Angular app is running on a different one
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

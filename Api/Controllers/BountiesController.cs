using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public record Bounty(int Id, string Title, string Category, decimal Reward, string Description);

[ApiController]
[Route("api/[controller]")]
public class BountiesController : ControllerBase
{
    private static readonly Bounty[] Bounties =
    [
        new(1, "Build API authentication demo", "Development", 1200, "Create sign-up, sign-in, and protected route examples."),
        new(2, "Redesign bounty dashboard", "Design", 850, "Design the desktop bounty discovery experience."),
        new(3, "Audit public API endpoints", "Security", 1600, "Review the API for common security gaps."),
        new(4, "Write starter documentation", "Content", 450, "Create concise setup and contribution guides.")
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Bounty>> Get() => Ok(Bounties);
}

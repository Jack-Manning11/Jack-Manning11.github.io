## What it is

ATLAS Arcana is an isometric video game I built with Jackson Greer as our undergraduate capstone in CU Boulder's Creative Technology and Design (CTD) program — a playful orientation to the program and the ATLAS Institute building it lives inside. The game is meant to be the thing new and transfer students arrive to: a guided tour of a strange building and a stranger program, disguised as something fun.

## How it plays

The game is software-first but not software-only. Two small custom arcade cabinets in the ATLAS lobby house a player's laptop running the game; most puzzles resolve on screen. A handful require leaving the cabinet entirely — walking to a room, finding something, solving a real-world clue, then bringing the answer back to the game.

## Where the idea came from

The project started in Fall 2023 in Research Methods and Professional Practice (RMPP), the first half of CTD's two-semester capstone sequence, taught by Sheiva Rezvani and Annie Margaret. Jackson and I had walked in with different individual ideas — mine was an isometric data-visualization of where CTD alumni go after graduation; his was a game about coordinating groups to solve climate problems. When groups formed mid-semester, we pulled the strongest threads from each into one project: an isometric tour of the building, gamified, with puzzles that mix interfaces. The name came much later.

We worked out the split as equal co-developers — same training, same toolkit, no specialty division — and held each other to a high standard through weekly planning meetings. Peter Gyory, who taught the Game Development course we took alongside RMPP, became our capstone advisor in the spring. We used his class for a small-scale prototype set in CTD's "Blow Things Up Lab" — proving both that the engine pipeline (Unity + Aseprite) was viable and that the isometric movement we wanted needed real custom tooling.

## The arcade cabinets

The original plan was a single full-size cabinet — monitor, dedicated computer, the whole thing. Cost, time, and the fact that a stationary cabinet conflicted with the ARG layer (more on that below) talked us out of it. We considered a backpack-mounted cabinet next, inspired by a UCLA project, that the player could carry while solving real-world puzzles — but weight, power, and the question of supervising the rig during the showcase made that impractical. We landed on two identical small-scale tabletop cabinets: a vertically-rotated monitor showing half the screen, the player's laptop tucked behind, the arcade joystick and buttons wired through a USB encoder.

Two cabinets, not one, because of *the ARG dilemma*. Mixed-interface puzzles are interesting because the player has to leave the cabinet to solve them. They're complicated because while the player is gone, a second player wanders up and tries to play a game in progress. The two-cabinet solution lets a second team start in parallel — and we leaned further, designing for two-person teams per cabinet: one stays at the screen, one goes hunting. That configuration is what made the rest of the design work.

## Sprite work

Everything visual was drawn from scratch in Aseprite. The building came first — we worked from blueprints, tried sixteen pixels per blueprint-square, and settled on eight after the math worked out cleaner against our character sprites. Sixty-odd rooms and hallways went into the floor plans. Only a fraction are interactable, but the ones that are had to feel inhabited.

The player is a robot. A robot because the program is technical, and because a faceless protagonist lets every player feel addressed without identifying anyone in particular. We custom-built the walk animator so that mid-stride direction changes preserve the current frame — the character turns mid-step instead of restarting the cycle. Small detail, big difference: eight-directional pixel movement feels fluid when it works and clunky the moment it doesn't.

The NPCs are real CTD faculty. We sent a formal permission email to core staff requesting consent to appear in the game and a sentence or two about their classes, which became their dialogue. Thirteen characters total — faculty, NPCs, and Jackson and me as bystanders. Each painted over a base human sprite that handled the body, with hair, accessories, and signature features picked out per person.

## The ARG layer

The puzzles that leave the game are what make the game itself an orientation rather than a stationary arcade title. We originally designed six elaborate physical puzzles — pulley systems, projector sheets that revealed answers when laid on colored paper, complicated set pieces. Two rounds of user testing made it clear the elaborate puzzles weren't pulling their weight: *getting players into the spaces* was the goal, not the spectacle of the puzzles themselves. We cut to four simpler ones, each anchored in a room we wanted new students to find:

- A code on a lobby wall — laser-cut twice from acrylic (which warped, then snapped), then a third time from wood. The wood version is the one currently installed.
- A jigsaw puzzle in the maker space: a nonsense poem in old-style letters with a password embedded in the bold characters, redesigned after testing showed the original was too hard to read.
- An aged treasure map in a basement classroom — made in Inkarnate, printed, then tea-stained and lightly burned to feel less printed and more found.
- A handmade wooden telephone sculpture wired to a button-and-wire combination, paired with the BTU lab puzzle in the game.

Each physical puzzle carries the same ARG indicator — the same symbol the player sees in the game whenever a puzzle's answer lives outside the screen. We tested the indicator through two rounds of usability before locking it. The point of the symbol was to make it unambiguous that *this answer is not in the game*; the symbol shows up in both worlds, marking the threshold.

## One engineering corner: layering

The hardest engineering problem of the project, by some distance, was making isometric depth-sorting feel right inside Unity's 2D pipeline. Unity ships nothing out-of-the-box for "this object is in front of that one when the player is south of it, behind it when the player is north of it" — every object across all three floors needed a unique sorting order that a runtime script kept in step with the player's exact position.

We solved it with a custom Unity editor tool. One slider per object — the x-offset of the bottom vertex of an isometric collider — generated both the walkable-area collider and the depth-sorting trigger automatically, working out the other seven vertices from the building's fixed iso angles and the sprite's width. The runtime script (we just called it *The Script*, because the project's structure depended on it being functional) auto-assigned every object an order-in-layer based on its y-position, skipping every other slot so the player could be cleanly inserted between objects at runtime. When the player walked into the trigger zone of an object, it joined a per-frame "behind these things" array; the script took the minimum order from that array, subtracted one, and set the player to it. Walking around a desk now looks like walking around a desk.

The same tool was later repurposed for opacity-grouping — letting the player stay visible through walls without each wall flickering on its own — by tying opacity to a room's floor sprite rather than to individual walls. Two pieces of tooling and a runtime script bought us a building you can move through.

## What the project was actually for

The surface goal of the game is to teach new students how to navigate ATLAS and what CTD does. The actual goal — the one we kept coming back to in design meetings — is to teach them something about the kind of curiosity the program rewards. To make the building feel readable as a place where the obvious answer is usually not the only one, where leaving the cabinet to find the answer is sometimes the point. If the game does that — and the testing suggests it does — the building stops being just a building. Which, when you're a new student, is most of what orientation has to do.

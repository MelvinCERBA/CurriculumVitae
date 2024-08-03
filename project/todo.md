# create Experiences & update tags & aliases
<!-- - [ ] GET /tags -->
## POST PATCH DELETE /experience -> creates Experience and associated Tags & Aliases
  - [x] TagCategoryService.create(createTagCategoryDto)
  - [x] TagService.create(createTagDto)
  - [x] ExperienceService.create(createExperienceDto)
  - [x] ExperienceService.update(updateExperienceDto)
  - [x] ExperienceService.delete(deleteExperienceDto)

# search & autocompletion endpoints
## add tags w/ their aliases & categories
- [x] slugcase tag name
- [x] POST & PATCH /tag {name, aliases, categories}
- [x] POST /tag/aliases {id, aliases} #TODO: ajouter aliases à un tag existant
- [x] GET /tag-categories
## POST /autocomplete-tag 
{"tag":"machin"} => looks like "MachineLearning" -aliasFor-> "AI"` & "Machinery" => `["AI", "Machinery"]`
- [ ] AutocompletionService.autocomple(start:string) : Tag[] 

# Error handling
generalize handling of DataSourceErrors (eg. DataSourceErrors.DUPLICATED_ENTRY) -> ExceptionFilter

# Tests
Tests edge cases : try to create tests that fail

# CRUD on everything for admin ?

# Database calls ExceptionFilter ?
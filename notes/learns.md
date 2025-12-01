## react-hooks/set-state-in-effect

Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

```js
C:\_PROJECTS\_projs\advanced-resume-projects\probe-advanced-b2b-teams-project-management-saas\client\src\components\workspace\project\edit-project-form.tsx:62:7
  60 |   useEffect(() => {
  61 |     if (project) {
> 62 |       setEmoji(project.emoji);
     |       ^^^^^^^^ Avoid calling setState() directly within an effect
  63 |       form.setValue("name", project.name);
  64 |       form.setValue("description", project.description);
  65 |     }

  // ===========================
  // original code
  useEffect(() => {
    if (project) {
      setEmoji(project.emoji);
      form.setValue("name", project.name);
      form.setValue("description", project.description);
    }
  }, [form, project]);
```
